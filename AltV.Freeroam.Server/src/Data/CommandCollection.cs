using System;
using System.Collections.Generic;
using AltV.Net.Elements.Entities;

public sealed class CommandCollection
{
    private Dictionary<string, Action<IPlayer, string[]>> Commands { get; set; } = new Dictionary<string, Action<IPlayer, string[]>>();

    public void Register(string id, Action<IPlayer, string[]> handler)
    {
        Commands.Add(id, handler);
    }
    
    public void Execute(IPlayer player, string id, string[] args)
    {
        try
        {
            Commands[id].Invoke(player, args);
        }
        catch (Exception e)
        {
            player.Emit("sendConsoleMessage", e.Message);
        }
    }
}
