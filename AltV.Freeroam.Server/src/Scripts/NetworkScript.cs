using System;
using System.Collections.Generic;
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;

public sealed class NetworkScript : IScript
{
    private RpcCollection Calls { get; set; } = new RpcCollection();

    public NetworkScript()
    {
        Alt.OnClient<IPlayer, string>("rpc:called", OnRpcCalled);
        Calls.Register("getPing", new Func<IPlayer, object>((player) =>
        {
            return player.Ping;
        }));
    }

    private void OnRpcCalled(IPlayer player, string id)
    {
        player.Emit("rpc:callback", id, Calls.Execute(player, id));
    }
}
