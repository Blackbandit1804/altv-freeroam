using System;
using System.Collections.Generic;
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;

public sealed class CommandScript : IScript
{
    private CommandCollection Commands { get; set; } = new CommandCollection();

    public CommandScript()
    {
        Alt.OnClient<IPlayer, string, string[]>("commandEntered", OnCommandEntered);
        Commands.Register("coords", new Action<IPlayer, string[]>((player, args) => player.Emit("sendConsoleMessage", $"x: {player.Position.X} y: {player.Position.Y} z: {player.Position.Z} yaw: {player.Rotation.Yaw}")));
    }

    private void OnCommandEntered(IPlayer player, string name, string[] args)
    {
        if (!Commands.Execute(player, name, args))
            player.Emit("sendConsoleMessage", "Unknown command");
    }
}