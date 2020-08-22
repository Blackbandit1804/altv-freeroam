using System;
using AltV.Net;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;

public sealed class CommandScript : IScript
{
    private const int MaxWeaponAmmo = 250;
    private CommandCollection Commands { get; set; } = new CommandCollection();

    public CommandScript()
    {
        Alt.OnClient<IPlayer, string, string[]>("commandEntered", Commands.Execute);
        Commands.Register("pos", (player, args) => player.Emit("sendConsoleMessage", $"x: {player.Position.X} y: {player.Position.Y} z: {player.Position.Z} yaw: {player.Rotation.Yaw}"));
        Commands.Register("veh", (player, args) => player.Emit("enterVehicle", Alt.CreateVehicle((uint)Enum.Parse(typeof(VehicleModel), args[0], true), player.Position, player.Rotation)));
        Commands.Register("del", (player, args) => player.Vehicle.Remove());
        Commands.Register("weapon", (player, args) => player.GiveWeapon((uint)Enum.Parse(typeof(WeaponModel), args[0], true), MaxWeaponAmmo, true));
        Commands.Register("tpm", (player, args) => player.Emit("teleportToMarker"));
        Commands.Register("heal", (player, args) =>
        {
            player.Health = player.MaxHealth;
            player.Armor = player.MaxArmor;
            if (player.IsInVehicle)
                player.Emit("fixVehicle", player.Vehicle);
        });
    }
}
