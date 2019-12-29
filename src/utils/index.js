import {
  isNil as eLodashIsNil,
  get as eLodashGet,
  map as eLodashMap
} from 'lodash';
import { useAuth as eUseAuth } from './useAuth';

export const lodashGet = eLodashGet;
export const lodashIsNil = eLodashIsNil;
export const lodashMap = eLodashMap;
export const useAuth = eUseAuth;
