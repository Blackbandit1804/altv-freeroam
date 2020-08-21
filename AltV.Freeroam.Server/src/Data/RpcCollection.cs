using System;
using System.Collections.Generic;
using AltV.Net.Elements.Entities;

public sealed class RpcCollection
{
    private Dictionary<string, Func<IPlayer, object>> Calls { get; set; } = new Dictionary<string, Func<IPlayer, object>>();

    public void Register(string id, Func<IPlayer, object> handler)
    {
        Calls.Add(id, handler);
    }

    public object Execute(IPlayer player, string id)
    {
        try
        {
            return Calls[id].Invoke(player);
        }
        catch (Exception e)
        {
            player.Emit("sendConsoleMessage", e.Message);
            return null;
        }
    }
}
