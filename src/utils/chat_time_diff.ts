export function getChatTimeDiff(createdAt: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - createdAt.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    switch (true) {
      case days > 1:
        return `${days} days ago`;
      case days === 1:
        return 'yesterday';
      case hours > 1:
        return `${hours} hours ago`;
      case minutes > 1:
        return `${minutes} minutes ago`;
      default:
        return `${seconds} seconds ago`;
    }
  }
  
  