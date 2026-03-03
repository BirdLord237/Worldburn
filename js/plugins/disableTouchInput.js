/*:
 * @target MZ
 * @plugindesc Disable all standard touch/mouse input.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/posts/1524993/
 * @help Free to use and/or modify for any project, no credit required.
 */
// Patch - prevent top-level touch input state changes.
;void (alias => {
  TouchInput._createNewState = function() {
    return Object.freeze(alias.apply(this, arguments));
  };
})(TouchInput._createNewState);

// Patch - remove in-game Touch UI option.
;void (alias => {
  Scene_Options.prototype.maxCommands = function() {
    return alias.apply(this, arguments) - 1;
  };
})(Scene_Options.prototype.maxCommands);
void (alias => {
  Window_Options.prototype.addCommand = function(name, symbol) {
    if (symbol !== "touchUI")
      alias.apply(this, arguments);
  };
})(Window_Options.prototype.addCommand);

// Patch - Touch UI option is always false.
;void (alias => {
  ConfigManager.applyData = function(config) {
    alias.apply(this, arguments);
    this.touchUI = false;  // Ignore value from file, always false.
  };
})(ConfigManager.applyData);