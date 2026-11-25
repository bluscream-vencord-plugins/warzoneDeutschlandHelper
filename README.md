# WarzoneDeutschlandHelper

Equicord user plugin for the "Call of Duty: Warzone Deutschland" Discord server and its Xavis temp voice bot. Built on [TempVoiceChannels](https://github.com/bluscream-vencord-plugins/tempVoiceChannels), which it needs.

## Features

- **Presets** that create a channel and set its voice status. Xavis names the channel itself and only offers kick and ban controls, so status is all a preset sets here.

Everything shared (menus, toolbox, delays, manual creation) is described in the TempVoiceChannels README.

## Install

Clone this repo **and** [TempVoiceChannels](https://github.com/bluscream-vencord-plugins/tempVoiceChannels) into `src/userplugins`, next to each other, then rebuild Equicord:

```sh
cd src/userplugins
git clone https://github.com/bluscream-vencord-plugins/tempVoiceChannels
git clone https://github.com/bluscream-vencord-plugins/warzoneDeutschlandHelper
```

Update both with `git pull` in their folders.
