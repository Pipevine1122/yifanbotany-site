# 预约接入

访客只需选日期、选时间、选择 In person / Zoom、写想聊什么；你审核后才确认。首页和 Meet 共用同一个日历，不分 office hours / research / mentoring 类型。

## 当前状态

- 首页已有小月历，Meet 为完整页面。
- 尚未连接真实日历，因此当前日期只是访客的**期望日期**，没有声称任何时段空闲。
- 选日期、填写时间、见面方式和简短留言后，打开预填邮件；访客仍需在邮箱中发送。网站不会假报请求已送达。

## 连接真实 availability

1. 在 Cal.com 连接个人与学校 Google 账户；只有存在独立 iCloud 日程时才额外接 iCloud。授权由账户本人完成。
2. 选择用于冲突检查的日历。可选活动标为 Free，或放进不参与检查的日历。
3. 创建一个会议类型，设定时长、开放时段，将地点设为访客可选 In person（Wickson Hall 2039）或 Zoom，并保留一个“想聊什么”问题，启用 **Requires Confirmation**，选择一个写入日历。
4. 将公开预约链接与服务生成的 inline embed URL 填进 `data/booking.toml`，验证后设置 `enabled = true`。首页和 Meet 会一起切换为真实嵌入日历。

只需要一个真实预约链接、日历授权和开放时间。账户密码和密钥不进入网站或聊天。聊天中的 Google connector 不等于访客预约后台。

## 上线前检查

两个账户的 Busy 时段不可约；Free / 排除的可选活动不挡预约；跨时区时间一致；提交请求后你收到邮件，接受后访客收到确认，目标日历只写入一次。

官方说明：[Inline embed](https://cal.com/embed)、[Requires Confirmation](https://cal.com/features/requires-confirmation)、[多日历](https://cal.com/blog/manage-personal-work-calendars-calcom)。

Workspace：Wickson Hall 2039。邮件请求会携带所选见面方式；Zoom 链接需在确认时提供，当前代码不会创建 Zoom 会议。
