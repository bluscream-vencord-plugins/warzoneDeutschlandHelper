/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

import { createTempVoice } from "../_tempVoice/core";
import { tempVoiceSettings } from "../_tempVoice/presets";

const GUILD_ID = "687345074627149873";
const PRESET_KEYS: ["presets"] = ["presets"];

const settings = definePluginSettings({
    ...tempVoiceSettings({
        guildId: GUILD_ID,
        // Xavis names the channel itself and only offers kick and ban buttons, but members may set the voice status.
        fields: { name: false, limit: false, privacy: false },
        description: "Each preset joins a create channel, waits for Xavis to move you, then sets the channel status.",
        usePresets: () => settings.use(PRESET_KEYS).presets,
        savePresets: presets => settings.store.presets = presets,
        defaultPresets: [
            { id: "rebirth-squad", name: "", status: "Rebirth Squad, jeder willkommen", creatorId: "1075481426260148304", limit: 0, privacy: "unchanged" }
        ]
    })
});

// Xavis posts "🎛️ @owner **Channel Control Panel** Du hast diesen Voice-Channel erstellt …" in every new channel.
const isControlPanel = (content: string) => content.includes("Channel Control Panel");

const tempVoice = createTempVoice({
    name: "WarzoneDeutschlandHelper",
    guildId: GUILD_ID,
    botId: "711242219344101429",
    store: () => settings.store,
    isPanel: m => isControlPanel(m.content),
    isCreatedNotice: (m, userId) => isControlPanel(m.content) && m.content.includes(`<@${userId}>`),

    async applyPreset(api, channelId, preset) {
        await api.pause(1500, 2500);
        api.openChat(channelId);
        if (!preset.status) return;
        await api.pause(1500, 2500);
        await api.setStatus(channelId, preset.status);
        await api.pause(800, 1200);
        api.scrollToBottom();
    }
});

export default definePlugin({
    name: "WarzoneDeutschlandHelper",
    description: "Creates preset voice channels on the Call of Duty: Warzone Deutschland server and sets their status for you.",
    authors: [{ name: "Bluscream", id: 467777925790564352n }],
    settings,

    contextMenus: tempVoice.contextMenus,
    flux: tempVoice.flux
});
