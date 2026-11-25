/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

import { registerServer, TempVoiceServer, unregisterServer } from "../tempVoiceChannels";
import { PATTERNS as CORE_PATTERNS } from "../tempVoiceChannels/patterns";
import { Preset, serverSettings } from "../tempVoiceChannels/presets";
import { PATTERNS } from "./patterns";

const PRESET_KEYS: ["presets"] = ["presets"];

const settings = definePluginSettings({
    ...serverSettings({
        defaultGuildId: PATTERNS.defaults.guildId,
        defaultBotId: PATTERNS.defaults.botId,
        guildId: (): string => settings.store.guildId,
        // Xavis names the channel itself and only offers kick and ban buttons, but members may set the voice status.
        fields: { name: false, limit: false, privacy: false },
        description: "Each preset joins a create channel, waits for Xavis to move you, then sets the channel status.",
        usePresets: (): Preset[] => settings.use(PRESET_KEYS).presets,
        savePresets: presets => settings.store.presets = presets,
        defaultPresets: [
            { id: "rebirth-squad", name: "", status: "Rebirth Squad, jeder willkommen", creatorId: PATTERNS.defaults.creatorId, limit: 0, privacy: "unchanged" }
        ]
    })
});

const isControlPanel = (content: string) => content.includes(PATTERNS.controlPanel);

const server: TempVoiceServer = {
    name: "WarzoneDeutschlandHelper",
    guildId: () => settings.store.guildId,
    botId: () => settings.store.botId,
    presets: () => settings.store.presets,
    profileIds: [CORE_PATTERNS.idKinds.activision],
    isPanel: m => isControlPanel(m.content),
    isCreatedNotice: (m, userId) => isControlPanel(m.content) && CORE_PATTERNS.mention(userId).test(m.content),

    async applyPreset(api, _channelId, preset) {
        await api.pause(1500, 2500);
        api.openChat();
        if (!preset.status) return;
        await api.pause(1500, 2500);
        await api.setStatus(preset.status);
        await api.pause(800, 1200);
        api.scrollToBottom();
    }
};

export default definePlugin({
    name: "WarzoneDeutschlandHelper",
    description: "Creates preset voice channels on the Call of Duty: Warzone Deutschland server and sets their status for you.",
    authors: [
        { name: "Bluscream", id: 467777925790564352n },
        { name: "Claude Opus 5.5", id: 0n },
        { name: "Claude Fable 5.2", id: 0n }
    ],
    dependencies: ["TempVoiceChannels"],
    settings,

    start() {
        registerServer(server);
    },

    stop() {
        unregisterServer(server.name);
    }
});
