import { Context, Schema } from "koishi";
import {} from "koishi-plugin-alapi"

export const name = "ip-query";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export const using = ["alapi"] as const;

export function apply(ctx: Context) {
  ctx
    .command("ip <ip:string>", "查询IP地址归属地")
    .example("ip 1.1.1.1  查询1.1.1.1的归属地信息")
    .action(async (_, ip) => {
      try {
        let result = await ctx.alapi.request("ip", { ip });
        return `${result.data.ip}：${result.data.pos}`;
      } catch (e) {
        if (e instanceof Error) return "IP查询时出现错误：" + e.message;
        else return "IP查询时出现未知错误";
      }
    });
}
