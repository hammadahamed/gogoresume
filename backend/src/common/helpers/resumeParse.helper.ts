import ResumeParseUsageModel, {
  IResumeParseUsage,
} from 'src/schemas/resumeParseUsage.schema';

const DAILY_PARSE_LIMIT = 5;

/**
 * Check if user has remaining parses for today
 */
export const isParseUsageAvailable = async (
  parseUsage: IResumeParseUsage,
): Promise<boolean> => {
  const today = new Date().toDateString();
  const lastParsedDay = parseUsage.lastParsed.toDateString();

  // New day - reset count
  if (today !== lastParsedDay) {
    return true;
  }

  return parseUsage.dailyParses < DAILY_PARSE_LIMIT;
};

/**
 * Get remaining parses for today
 */
export const getRemainingParses = async (
  parseUsage: IResumeParseUsage,
): Promise<number> => {
  const today = new Date().toDateString();
  const lastParsedDay = parseUsage.lastParsed.toDateString();

  // New day - full limit available
  if (today !== lastParsedDay) {
    return DAILY_PARSE_LIMIT;
  }

  return Math.max(0, DAILY_PARSE_LIMIT - parseUsage.dailyParses);
};

/**
 * Increment parse usage after successful parse
 */
export const incrementParseUsage = async (
  userId: string,
  parseUsageDoc?: IResumeParseUsage,
): Promise<number> => {
  const parseUsage =
    parseUsageDoc || (await ResumeParseUsageModel.findOne({ userId }));

  if (!parseUsage) {
    // Create new record
    const newUsage = await ResumeParseUsageModel.create({
      userId,
      lastParsed: new Date(),
      dailyParses: 1,
      totalParses: 1,
    });
    return DAILY_PARSE_LIMIT - newUsage.dailyParses;
  }

  const today = new Date().toDateString();
  const lastParsedDay = parseUsage.lastParsed.toDateString();

  if (today !== lastParsedDay) {
    parseUsage.dailyParses = 1; // New day - first parse
  } else {
    parseUsage.dailyParses++; // Same day - increment
  }

  parseUsage.totalParses++;
  parseUsage.lastParsed = new Date();

  await parseUsage.save();

  return DAILY_PARSE_LIMIT - parseUsage.dailyParses;
};

/**
 * Get or create parse usage record for user
 */
export const getOrCreateParseUsage = async (
  userId: string,
): Promise<IResumeParseUsage> => {
  let parseUsage = await ResumeParseUsageModel.findOne({ userId });

  if (!parseUsage) {
    parseUsage = await ResumeParseUsageModel.create({
      userId,
      lastParsed: new Date(),
      dailyParses: 0,
      totalParses: 0,
    });
  }

  return parseUsage;
};
