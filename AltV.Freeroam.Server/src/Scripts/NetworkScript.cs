using System;
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;

public sealed class NetworkScript : IScript
{
    private RpcCollection Calls { get; set; } = new RpcCollection();

    public NetworkScript()
    {
        Alt.OnClient<IPlayer, string>("rpc:called", (player, id) => player.Emit("rpc:callback", id, Calls.Execute(player, id)));
        Calls.Register("getPing", ((player) => player.Ping));
    }
}
