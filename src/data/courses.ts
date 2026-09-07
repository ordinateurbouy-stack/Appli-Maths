import { CourseSheet } from '../types';
import { SECONDE_COURSES } from './courses/seconde';
import { PREMIERE_COURSES } from './courses/premiere';
import { TERMINALE_COURSES } from './courses/terminale';

export const COURSES_DATA: Record<string, CourseSheet> = {
  ...SECONDE_COURSES,
  ...PREMIERE_COURSES,
  ...TERMINALE_COURSES,
};
