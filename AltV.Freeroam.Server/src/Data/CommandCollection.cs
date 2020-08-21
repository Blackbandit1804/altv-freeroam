using System;
using System.Collections.Generic;
using AltV.Net.Elements.Entities;

public sealed class CommandCollection
{
    private Dictionary<string, Action<IPlayer, string[]>> Commands { get; set; } = new Dictionary<string, Action<IPlayer, string[]>>();

    public void Register(string name, Action<IPlayer, string[]> handler) => Commands.Add(name, handler);

    public void Execute(IPlayer player, string name, string[] args)
    {
        try
        {
            Commands[name].Invoke(player, args);
        }
        catch (Exception e)
        {
            player.Emit("sendConsoleMessage", e.Message);
        }
    }
}
