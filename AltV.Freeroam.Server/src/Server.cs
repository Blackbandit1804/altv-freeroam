using AltV.Net;
using AltV.Net.EntitySync;
using AltV.Net.EntitySync.ServerEvent;
using AltV.Net.EntitySync.SpatialPartitions;

public sealed class Server : Resource
{
    public override void OnStart()
    {
        AltEntitySync.Init(1, 100, false,
            (threadCount, repository) => new ServerEventNetworkLayer(threadCount, repository),
            (entity, threadCount) => (entity.Id % threadCount),
            (entityId, entityType, threadCount) => (entityId % threadCount),
            (threadId) => new LimitedGrid3(50_00, 50_00, 100, 10_000, 10_000, 300),
            new IdProvider());
    }

    public override void OnStop()
    {
        AltEntitySync.Stop();
    }
}
