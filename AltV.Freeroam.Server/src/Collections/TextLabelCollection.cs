using System.Collections;
using System.Collections.Generic;
using AltV.Net.Elements.Entities;
using AltV.Net.EntitySync;

public sealed class TextLabelCollection : IEnumerable<TextLabel>
{
    private List<TextLabel> TextLabels { get; set; } = new List<TextLabel>();

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
