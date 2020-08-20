using System;
using System.Collections.Generic;
using AltV.Net.Elements.Entities;

public sealed class CommandCollection
{
    private Dictionary<string, Action<IPlayer, string[]>> Commands { get; set; } = new Dictionary<string, Action<IPlayer, string[]>>();

    public void Register(string name, Action<IPlayer, string[]> handler) => Commands.Add(name, handler);

    public bool Execute(IPlayer player, string name, string[] args)
    {
        if (!Commands.ContainsKey(name))
            return false;
        Commands[name].Invoke(player, args);
        return true;
    }
}