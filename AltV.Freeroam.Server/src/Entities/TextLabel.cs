using System.Numerics;
using AltV.Net.Data;

public sealed class TextLabel : AltV.Net.EntitySync.Entity, AltV.Net.EntitySync.IEntity
{
    public string Text { get => text; set { text = value; SetData("text", value); } }
    public float Scale { get => scale; set { scale = value; SetData("scale", value); } }
    public uint Font { get => font; set { font = value; SetData("font", value); } }
    public Rgba Color { get => color; set { color = value; SetData("color", value); } }
    private string text;
    private float scale;
    private uint font;
    private Rgba color;

    public TextLabel(Vector3 position, uint range, string text, float scale, uint font, Rgba color) : base((ulong)EntityType.TextLabel, position, AltV.Net.Data.Dimension.DefaultDimension, range)
    {
        Text = text;
        Scale = scale;
        Font = font;
        Color = color;
    }
}
