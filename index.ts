import fs from 'node:fs';
import process from 'node:process';
import * as dotenv from 'dotenv'
dotenv.config();

const schedUrl = process.env.SCHED_URL;
const schedKey = process.env.SCHED_KEY_RO;
const exportFile = 'openfeedback.json';
const timeZone = '+02:00';

async function getSessions() {
  const response = await fetch(`${schedUrl}/api/session/export?api_key=${schedKey}&format=json&strip_html=Y`);
  const sessions = await response.json() as SCSession[];
  return sessions
    .filter(s => s.active && (s.event_subtype === 'Talk' || s.event_subtype === 'Workshop'));
}

async function getAvatars() {
  const response = await fetch(`${schedUrl}/api/user/list?api_key=${schedKey}&format=json&fields=username,avatar`);
  return await response.json() as SCAvatar[];
}

function convertSCTimeToOFTime(time: string) {
  return time.replace(' ', 'T') + timeZone;
}

function exportOFData(sessions: SCSession[], avatars: SCAvatar[]) {
  const avatarByUsername: Record<string, string> = {};
  const data: OFData = {
    sessions: {},
    speakers: {}
  };

  for (const avatar of avatars) {
    avatarByUsername[avatar.username] = avatar.avatar;
  }

  for (const session of sessions) {
    const speakers = session.speakers.map(speaker => {
      data.speakers[speaker.id] = {
        id: speaker.id,
        name: speaker.name,
        ...(avatarByUsername[speaker.username] ? { photoUrl: avatarByUsername[speaker.username] } : {})
      }
      return speaker.id;
    });
    data.sessions[session.id] = {
      id: session.id,
      tags: [session.event_type, session.event_subtype],
      title: session.name,
      startTime: convertSCTimeToOFTime(session.event_start),
      endTime: convertSCTimeToOFTime(session.event_end),
      trackTitle: session.venue,
      speakers
    };
  }

  return data;
}

async function main() {
  console.log('Retrieving sessions from sched...');

  const sessions = await getSessions();
  const avatars = await getAvatars();
  const data = exportOFData(sessions, avatars);

  fs.writeFileSync(exportFile, JSON.stringify(data, null, 2))

  console.log(`Exported data to "${exportFile}" successfully.`);
}

main();
