import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Slack client
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID || 'C0C7GM1FQKT';

// Store standups in memory (TODO: use database)
let cachedStandups: any[] = [];

// Parse standup message format
interface ParsedStandup {
  project: string;
  devChannel: string;
  doneTasks: string[];
  nextTasks: string[];
  blockers: string;
  readyForQA: string;
  capacity: string;
  userId: string;
  timestamp: string;
}

function parseStandupMessage(text: string, userId: string, timestamp: string): ParsedStandup[] {
  // Split by "Project:" to get multiple project blocks
  const projectBlocks = text.split(/Project:/i).slice(1); // Skip first empty split

  return projectBlocks.map((block) => {
    const lines = block.trim().split('\n');

    // Extract project name and dev channel
    const firstLine = lines[0] || '';
    const projectMatch = firstLine.match(/^([^|]+)\s*\|\s*(#[\w-]+)/);
    const project = projectMatch?.[1]?.trim() || 'Unknown';
    const devChannel = projectMatch?.[2]?.trim() || '#dev';

    // Extract sections
    const doneMatch = block.match(/•\s*Done today:?\s*([^\n]*)/i);
    const nextMatch = block.match(/•\s*Next:?\s*([^\n]*)/i);
    const blockersMatch = block.match(/•\s*Blockers:?\s*([^\n]*)/i);
    const qaMatch = block.match(/•\s*Ready for QA:?\s*([^\n]*)/i);
    const capacityMatch = block.match(/Capacity:?\s*([^\n]*)/i);

    const doneTasks = (doneMatch?.[1] || '')
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t && t.toLowerCase() !== 'none');

    const nextTasks = (nextMatch?.[1] || '')
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t && t.toLowerCase() !== 'none');

    return {
      project,
      devChannel,
      doneTasks,
      nextTasks,
      blockers: blockersMatch?.[1]?.trim() || 'None',
      readyForQA: qaMatch?.[1]?.trim() || 'None',
      capacity: capacityMatch?.[1]?.trim() || 'Full',
      userId,
      timestamp,
    };
  });
}

// Fetch standups from Slack
async function fetchStandups() {
  try {
    console.log('Fetching standups from Slack...');

    // Get messages from the channel
    const result = await slack.conversations.history({
      channel: CHANNEL_ID,
      limit: 100,
    });

    const messages = result.messages || [];

    // Parse messages
    const standups: any[] = [];
    const userIds = new Set<string>();

    for (const msg of messages) {
      if (!msg.text || msg.subtype) continue; // Skip bot messages and replies

      const userId = msg.user || 'unknown';
      userIds.add(userId);

      const parsedMessages = parseStandupMessage(msg.text, userId, msg.ts || '');
      standups.push(...parsedMessages);
    }

    // Get user info
    const userInfo: { [key: string]: any } = {};
    for (const userId of userIds) {
      try {
        const userResult = await slack.users.info({ user: userId });
        if (userResult.user) {
          userInfo[userId] = {
            name: userResult.user.real_name || userResult.user.name,
            email: userResult.user.profile?.email,
            avatar: userResult.user.profile?.image_72,
          };
        }
      } catch (e) {
        console.error(`Failed to fetch user ${userId}:`, e);
      }
    }

    // Enrich standups with user info
    const enrichedStandups = standups.map((standup) => ({
      ...standup,
      developer: userInfo[standup.userId] || { name: 'Unknown', email: '' },
    }));

    cachedStandups = enrichedStandups;
    console.log(`✅ Fetched ${enrichedStandups.length} standups`);
    return enrichedStandups;
  } catch (error) {
    console.error('Error fetching standups:', error);
    return [];
  }
}

// API Endpoints

// Get all standups
app.get('/api/standups', async (req, res) => {
  try {
    if (cachedStandups.length === 0) {
      await fetchStandups();
    }
    res.json({
      success: true,
      data: cachedStandups,
      count: cachedStandups.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch standups',
    });
  }
});

// Refresh standups (manual fetch)
app.post('/api/standups/refresh', async (req, res) => {
  try {
    const standups = await fetchStandups();
    res.json({
      success: true,
      data: standups,
      message: 'Standups refreshed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to refresh standups',
    });
  }
});

// Get standups by project
app.get('/api/standups/project/:projectName', (req, res) => {
  const projectName = req.params.projectName.toLowerCase();
  const filtered = cachedStandups.filter(
    (s) => s.project.toLowerCase() === projectName
  );
  res.json({
    success: true,
    data: filtered,
    count: filtered.count,
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Standup.ly Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/standups`);
  console.log(`🔄 Refresh: POST http://localhost:${PORT}/api/standups/refresh\n`);

  // Initial fetch
  fetchStandups();

  // Refresh every 30 minutes
  setInterval(fetchStandups, 30 * 60 * 1000);
});
