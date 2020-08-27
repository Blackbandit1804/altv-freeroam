using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using AltV.Net.EntitySync;

public sealed class TextLabelCollection : IEnumerable<TextLabel>
{
    private ICollection<TextLabel> TextLabels { get; } = new Collection<TextLabel>();

    public void Add(TextLabel textLabel)
    {
        TextLabels.Add(textLabel);
        AltEntitySync.AddEntity(textLabel);
    }

    public void Remove(TextLabel textlabel)
    {
        TextLabels.Remove(textlabel);
        AltEntitySync.RemoveEntity(textlabel);
    }

    public IEnumerator<TextLabel> GetEnumerator() => TextLabels.GetEnumerator();

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
