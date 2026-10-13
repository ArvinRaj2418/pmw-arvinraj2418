import { DomainError } from '../src/domain.mjs';
// Tool results become model input. Measure them and keep them inside an explicit budget.
export const DEFAULT_TOKEN_BUDGET=1500;
const LIST_FIELDS=['items','features'];
export function estimateTokens(text) {
  // LAB02_USAGE_START
  if(typeof text!=='string')throw new DomainError('INVALID_INPUT','Token estimate needs text.');
  return Math.ceil(text.length/4);
  // LAB02_USAGE_END
}
export function budgetResult(value, maxTokens=DEFAULT_TOKEN_BUDGET) {
  // LAB02_BUDGET_START
  if(!Number.isInteger(maxTokens)||maxTokens<50)throw new DomainError('INVALID_INPUT','Token budget must be an integer of at least 50.');
  const serialized=JSON.stringify(value);
  if(typeof serialized!=='string')throw new DomainError('INVALID_INPUT','Result must be JSON serializable.');
  if(estimateTokens(serialized)<=maxTokens)return {value,truncated:false};
  const field=LIST_FIELDS.find(key=>Array.isArray(value?.[key]));
  if(!field)throw new DomainError('RESULT_TOO_LARGE','Result exceeds the tool token budget. Request a narrower record.');
  const original=value[field];
  const kept=[...original];
  const shaped=()=>({...value,[field]:kept,truncated:true,omitted:original.length-kept.length,hint:'Result truncated to the token budget. Narrow the query or read one feature.'});
  while(kept.length&&estimateTokens(JSON.stringify(shaped()))>maxTokens)kept.pop();
  const result=shaped();
  if(estimateTokens(JSON.stringify(result))>maxTokens)throw new DomainError('RESULT_TOO_LARGE','Result exceeds the tool token budget. Request a narrower record.');
  return {value:result,truncated:true};
  // LAB02_BUDGET_END
}
export function usageRecord({tool,args={},text,durationMs,isError=false,truncated=false}) {
  // LAB02_RECORD_START
  const argKeys=args&&typeof args==='object'&&!Array.isArray(args)?Object.keys(args).sort():[];
  return {ts:new Date().toISOString(),tool,argKeys,resultBytes:Buffer.byteLength(text,'utf8'),estTokens:estimateTokens(text),durationMs:Math.round(durationMs*100)/100,isError,truncated};
  // LAB02_RECORD_END
}
