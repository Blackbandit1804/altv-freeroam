using AltV.Net;
using AltV.Net.Elements.Entities;
using AltV.Net.EntitySync;
using AltV.Net.EntitySync.ServerEvent;
using AltV.Net.EntitySync.SpatialPartitions;

public sealed class EntityScript : IScript
{
    private TextLabelCollection TextLabels { get; } = new TextLabelCollection();
    private MarkerCollection Markers { get; } = new MarkerCollection();

    public EntityScript()
    {
        AltEntitySync.Init(1, 100, false,
            (threadCount, repository) => new ServerEventNetworkLayer(threadCount, repository),
            (entity, threadCount) => (entity.Id % threadCount),
            (entityId, entityType, threadCount) => (entityId % threadCount),
            (threadId) => new LimitedGrid3(50_000, 50_000, 100, 10_000, 10_000, 300), new IdProvider());
    }

    [ScriptEvent(ScriptEventType.ColShape)]
    public void OnEntityColShapeHit(IColShape colShape, AltV.Net.Elements.Entities.IEntity entity, bool state) => Markers.Find(colShape)?.Handler?.Invoke(colShape, entity, state);
}
