"""Procedural textures for the 3D studio (floor and desk in onyx effect), seamless (tileable)."""
import numpy as np
from PIL import Image
rng = np.random.default_rng(7)
N = 1024

def tile_noise(n, octaves, seed):
    r = np.random.default_rng(seed)
    out = np.zeros((n, n))
    amp = 1.0
    for o in range(octaves):
        f = 2 ** (o + 2)
        g = r.random((f, f))
        # bilinear upsample with wrap (periodic → seamless)
        xs = np.linspace(0, f, n, endpoint=False)
        x0 = np.floor(xs).astype(int); t = xs - x0; x1 = (x0 + 1) % f
        t = t * t * (3 - 2 * t)
        a = g[x0][:, x0]; b = g[x0][:, x1]; c = g[x1][:, x0]; d = g[x1][:, x1]
        tx = t[None, :]; ty = t[:, None]
        layer = (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty
        out += layer * amp
        amp *= 0.5
    return out / out.max()

def marble(base, band, vein, seed, freq=1.6):
    n1 = tile_noise(N, 6, seed)
    n2 = tile_noise(N, 3, seed + 11)
    n3 = tile_noise(N, 4, seed + 23)
    y, x = np.mgrid[0:N, 0:N] / N
    # broad flowing bands (domain warp)
    b = np.sin(2 * np.pi * (freq * (x + 0.35 * y) + 2.2 * n1 + 0.8 * n3))
    bands = ((b + 1) / 2) ** 2.2
    # few thin veins
    v = np.sin(2 * np.pi * (2 * (0.7 * x - y) + 3.0 * n2))
    veins = np.exp(-55 * np.abs(v)) * np.clip((n3 - 0.35) * 4, 0, 1)
    cloud = (n3 - 0.5) * 0.10
    base = np.array(base) / 255; band = np.array(band) / 255; vein = np.array(vein) / 255
    img = base * (1 + cloud[..., None])
    img = img * (1 - 0.6 * bands[..., None]) + band * 0.6 * bands[..., None]
    img = img * (1 - 0.7 * veins[..., None]) + vein * 0.7 * veins[..., None]
    return Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8))

marble((240, 229, 216), (214, 186, 160), (170, 128, 98), 3).save("tex/marble.jpg", quality=82)
marble((232, 214, 190), (196, 160, 120), (140, 100, 70), 21, freq=2.4).resize((512, 512)).save("tex/onyx.jpg", quality=82)
print("ok")
