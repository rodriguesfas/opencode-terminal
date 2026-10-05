# OpenCode Terminal Plugin

## Description

The **OpenCode Terminal Plugin** is a plugin for OpenCode (version 1.18.34+) that adds a **🖥 Terminal** command/shortcut to the TUI (Text User Interface). When activated, it opens a real Linux terminal/interactive shell separated from OpenCode, already running in the **same directory/workspace/project** where OpenCode is currently working.

## Features

- **Opens terminal in current workspace**: The terminal always opens in the same directory where OpenCode is executing, so you don't need to navigate to your project folder.
- **Multiple terminal support**: Detects and uses the best available terminal emulator installed on your system.
- **Workspace-aware**: Correctly detects the OpenCode workspace directory, supporting multiple projects.
- **Customizable keybinding**: Configurable keyboard shortcut (default: Ctrl+T, can be changed).
- **Command palette**: Available via `Ctrl+Shift+P` → type "terminal".
- **Fallback terminals**: Priority order: gnome-terminal → kitty → alacritty → konsole → xfce4-terminal → xterm.

## Installation

### Prerequisites

- OpenCode 1.18.34 or newer
- Git
- A Linux terminal emulator (gnome-terminal is used as default)

### Install via OpenCode Plugin System

```bash
# Navigate to your plugin directory or install directly
opencode plugin install /path/to/opencode-terminal-plugin

# Or using npm link
cd /path/to/opencode-terminal
npm link
opencode plugin install opencode-terminal-plugin
```

### Manual Installation

1. Clone or copy this repository to your OpenCode plugins directory:
   ```bash
   # Option 1: ~/.config/opencode/plugins/
   git clone https://github.com/your-username/opencode-terminal.git ~/.config/opencode/plugins/opencode-terminal
   
   # Option 2: ~/.local/share/opencode/plugins/
   git clone https://github.com/your-username/opencode-terminal.git ~/.local/share/opencode/plugins/opencode-terminal
   ```

2. Install the plugin:
   ```bash
   opencode plugin install opencode-terminal-plugin
   ```

3. Restart OpenCode if it's running

## Usage

### Command Palette

1. Open OpenCode: `opencode`
2. Open command palette: `Ctrl+Shift+P`
3. Type "terminal" or "🖥 Terminal"
4. Select the command to open the terminal

### Keyboard Shortcut

The default shortcut is **Ctrl+T**. If this shortcut is already in use by OpenCode, you can:

1. Modify the keybinding in the plugin's `index.js` file
2. Or use the command palette instead

### Opening Terminal in a Different Project

If you open OpenCode in a different project directory, the terminal will automatically open in that new project's directory - no configuration needed.

## Plugin Configuration

The plugin detects the workspace directory automatically from OpenCode's state. If you need to customize:

- **Terminal priority**: Edit the `TERMINAL_PRIORITY` array in `index.js`
- **Keybinding**: Modify the `key` field in the `registerLayer` call
- **Terminal command**: Modify the `openTerminal` function

## Supported Terminals

The plugin checks for available terminals in this priority order:

1. **gnome-terminal** - GNOME Terminal (tested and working)
2. **kitty** - Kitty terminal
3. **alacritty** - Alacritty terminal
4. **konsole** - KDE Konsole
5. **xfce4-terminal** - XFCE Terminal
6. **xterm** - X Terminal (basic fallback)

If none are installed, the plugin will attempt to use `gnome-terminal` as a fallback.

## Development

### Project Structure

```
/opencode-terminal/
│
├── index.js        # Main plugin entry point
├── package.json    # npm package configuration
├── README.md       # Documentation (this file)
└── .opencode/
    └── opencode.json  # OpenCode plugin configuration
```

### How It Works

1. The plugin registers a command "🖥 Terminal" via OpenCode's TUI keymap system
2. When activated, it detects the current workspace directory from OpenCode's state
3. It spawns a terminal process with `cd` set to the workspace directory
4. The terminal runs an interactive bash shell

### Adding Support for Additional Terminals

To add support for another terminal emulator, edit the `detectAvailableTerminal()` function in `index.js` and add the new terminal to the `TERMINAL_PRIORITY` array. The `openTerminal()` function also needs a case entry for the new terminal.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- GitHub: [https://github.com/your-username/opencode-terminal](https://github.com/your-username/opencode-terminal)
- OpenCode: [https://opencode.ai](https://opencode.ai)

---

**Generated**: 2026

**Plugin Version**: 1.0.0