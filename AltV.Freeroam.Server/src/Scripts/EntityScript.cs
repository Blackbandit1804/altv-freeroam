using System;
using System.Collections.Generic;
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.EntitySync;
using AltV.Net.EntitySync.ServerEvent;
using AltV.Net.EntitySync.SpatialPartitions;
using AltV.Net.Enums;

public sealed class EntityScript : IScript
{
    private IEnumerable<Position> SpawnPositions { get; set; } = new Position[] {
        new Position(-61.0f, -135.4f, 56.8f)
    };
    public TextLabelCollection TextLabels { get; set; } = new TextLabelCollection();

    public EntityScript()
    {
        AltEntitySync.Init(1, 100, false,
            (threadCount, repository) => new ServerEventNetworkLayer(threadCount, repository),
            (entity, threadCount) => (entity.Id % threadCount),
            (entityId, entityType, threadCount) => (entityId % threadCount),
            (threadId) => new LimitedGrid3(50_000, 50_000, 100, 10_000, 10_000, 300), new IdProvider());
    }

    [ScriptEvent(ScriptEventType.PlayerConnect)]
    public void OnPlayerConnect(IPlayer player, string reason)
    {
        player.Model = (uint)PedModel.FreemodeMale01;
        player.Spawn(SpawnPositions.Random());
        player.Emit("clientConnected");
    }

    [ScriptEvent(ScriptEventType.PlayerDisconnect)]
    public void OnPlayerDisconnect(IPlayer player, string reason)
    {
        
    }

    [ClientEvent("clientSpawned")]
    public void OnClientSpawned(IPlayer player)
    {

    }
}
