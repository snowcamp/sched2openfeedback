interface OFData {
  sessions: Record<string, OFSession>
  speakers: Record<string, OFSpeaker>
}

interface OFSession {
  id: string;
  speakers: string[];
  tags: string[];
  title: string;
  startTime: string,
  endTime: string,
  trackTitle: string;
  hideInFeedback?: boolean;
}

interface OFSpeaker {
  id: string;
  name:string;
  photoUrl?: string;
  socials?: OFSocialLink[];
}

interface OFSocialLink {
  name: string;
  link: string;
}

interface SCSession {
  id: string;
  event_key: string;
  active: boolean;
  name: string;
  event_start: string;
  event_end: string;
  event_type: string;
  event_subtype: string;
  description?: string;
  venue: string;
  company: string;  // Language for Snowcamp
  speakers: SCSpeaker[];
}

interface SCSpeaker {
  id: string;
  username: string;
  name: string;
  company: string;
  custom_order: number;
}

interface SCAvatar {
  // Sched user API does not provide id, so we use username instead
  username: string;
  avatar: string;
}
