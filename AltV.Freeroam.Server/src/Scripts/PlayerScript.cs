using System.Collections.Generic;
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;

public sealed class PlayerScript : IScript
{
    private IEnumerable<Position> SpawnPositions { get; set; } = new Position[] {
        new Position(-61.0f, -135.4f, 56.8f)
    };

    [ScriptEvent(ScriptEventType.PlayerConnect)]
    public void OnPlayerConnect(IPlayer player, string reason)
    {
        player.Model = (uint)PedModel.FreemodeMale01;
        player.Spawn(SpawnPositions.Random());
        player.Emit("clientConnected");
    }
}
