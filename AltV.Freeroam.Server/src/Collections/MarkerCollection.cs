using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using AltV.Net.Elements.Entities;
using AltV.Net.EntitySync;

public sealed class MarkerCollection : IEnumerable<Marker>
{
    private ICollection<Marker> Markers { get; } = new Collection<Marker>();

    public void Add(Marker marker)
    {
        Markers.Add(marker);
        AltEntitySync.AddEntity(marker);
    }

    public void Remove(Marker marker)
    {
        Markers.Remove(marker);
        AltEntitySync.RemoveEntity(marker);
    }

    public Marker Find(IColShape colShape) => Markers.ToList().Find(x => x.ColShape.Equals(colShape));

    public IEnumerator<Marker> GetEnumerator() => Markers.GetEnumerator();

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
