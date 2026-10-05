module.exports = async function terminalPlugin(api, options, meta) {
  // Get workspace directory
  let cwd = api.state?.directory;
  if (!cwd) {
    cwd = require("node:os").homedir();
  }
  console.error(`Terminal plugin loaded. CWD: ${cwd}`);

  // Method 1: Try to add command via the legacy command API
  if (api.command && typeof api.command.register === "function") {
    try {
      api.command.register(() => [{
        title: "🖥 Terminal",
        onSelect: () => {
          const { spawn } = require("child_process");
          const proc = spawn("gnome-terminal", ["--", "bash", "-c", `cd "${cwd}" && exec bash`], {
            stdio: "inherit",
            detached: false,
          });
          proc.unref();
        },
        description: "Open terminal in current workspace",
      }]);
      console.error("Registered via command.register");
      return;
    } catch (e) {
      console.error("command.register failed:", e.message);
    }
  }

  // Method 2: Try registering via keymap with a specific binding
  try {
    if (api.keymap?.registerLayer) {
      api.keymap.registerLayer({
        commands: [{
          title: "🖥 Terminal",
          onSelect: () => {
            const { spawn } = require("child_process");
            const proc = spawn("gnome-terminal", ["--", "bash", "-c", `cd "${cwd}" && exec bash`], {
              stdio: "inherit",
              detached: false,
            });
            proc.unref();
          },
          description: "Open terminal in current workspace",
        }],
        bindings: [{
          key: "Ctrl+`,
          command: "🖥 Terminal",
        }],
      });
      console.error("Registered via keymap.registerLayer");
    }
  } catch (e) {
    console.error("keymap.registerLayer failed:", e.message);
  }

  // Method 3: Try to dispatch command programmatically
  try {
    if (api.keymap?.dispatchCommand) {
      // Try dispatching after a delay
      setTimeout(() => {
        try {
          api.keymap.dispatchCommand("🖥 Terminal");
          console.error("Dispatch attempted");
        } catch (e) {
          console.error("dispatchCommand failed:", e.message);
        }
      }, 1000);
    }
  } catch (e) {
    // Ignore
  }

  console.error("Terminal plugin initialization complete");
};