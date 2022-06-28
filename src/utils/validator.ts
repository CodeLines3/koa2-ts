import Joi from "joi";
/**
 * @description 获取验证规则
 * @param schema 规则参数
 * @returns Joi.ObjectSchema<any>
 */
export function getJoiSchemas (schema: Joi.PartialSchemaMap<any>) {
  return Joi.object(schema);
}