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
        Commands.Register("coords", new Action<IPlayer, string[]>((player, args) =>
        {
            player.Emit("sendConsoleMessage", $"x: {player.Position.X} y: {player.Position.Y} z: {player.Position.Z} yaw: {player.Rotation.Yaw}");
        }));
        Commands.Register("veh", new Action<IPlayer, string[]>((player, args) =>
        {
            player.Emit("enterVehicle", Alt.CreateVehicle((uint)Enum.Parse(typeof(VehicleModel), args[0], true), player.Position, player.Rotation));
        }));
    }

    private void OnCommandEntered(IPlayer player, string name, string[] args)
    {
        Commands.Execute(player, name, args);
    }
}