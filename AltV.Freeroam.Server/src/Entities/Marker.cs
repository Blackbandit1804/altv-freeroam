using System;
using System.Numerics;
using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;

public sealed class Marker : AltV.Net.EntitySync.Entity, AltV.Net.EntitySync.IEntity
{
    public uint MarkerType { get => markerType; set { markerType = value; SetData("markerType", value); } }
    public uint MarkerSize { get => markerSize; set { markerSize = value; SetData("markerSize", value); } }
    public Rgba Color { get => color; set { color = value; SetData("color", value); } }
    public bool BobUpAndDown { get => bobUpAndDown; set { bobUpAndDown = value; SetData("bobUpAndDown", value); } }
    public bool FaceCamera { get => faceCamera; set { faceCamera = value; SetData("faceCamera", value); } }
    public bool Rotate { get => rotate; set { rotate = value; SetData("rotate", value); } }
    public IColShape ColShape { get; }
    public Action<IColShape, AltV.Net.Elements.Entities.IEntity, bool> Handler { get; }
    public uint ColShapeSize { get; }
    private uint markerType;
    private uint markerSize;
    private Rgba color;
    private bool bobUpAndDown;
    private bool faceCamera;
    private bool rotate;

    public Marker(
        Vector3 position,
        uint range,
        uint colShapeSize,
        uint markerSize,
        MarkerType markerType,
        Action<IColShape, AltV.Net.Elements.Entities.IEntity, bool> handler,
        Rgba color,
        bool bobUpAndDown,
        bool faceCamera,
        bool rotate) : base((ulong)EntityType.Marker, position, AltV.Net.Data.Dimension.DefaultDimension, range)
    {
        MarkerSize = markerSize;
        MarkerType = (uint)markerType;
        Handler = handler;
        Color = color;
        BobUpAndDown = bobUpAndDown;
        FaceCamera = faceCamera;
        Rotate = rotate;
        ColShape = Alt.CreateColShapeCircle(position, colShapeSize);
    }
}
