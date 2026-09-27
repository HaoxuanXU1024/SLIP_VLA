# SLIP-VLA project page

Project website for **SLIP-VLA: Single-Step Latent Imagination for Policy Learning in Vision-Language-Action Models**.

- Website: https://haoxuanxu1024.github.io/SLIP_VLA/
- Static HTML, CSS, and JavaScript; no build step.
- 36 unique demonstration videos, six real-world conditions with four camera views each, and six paired simulation comparisons.
- Locally hosted fonts and media; no analytics or external runtime dependencies.

## Preview locally

```sh
python3 -m http.server 8937
```

Open http://localhost:8937/.

## Publishing

GitHub Pages publishes the root of the `main` branch. Push updates to `main` to update the site. `.nojekyll` makes this a plain static site.

## Editing

- `index.html`: paper title, authors, affiliations, figures, results, and citation.
- `app.js`: video groupings, camera labels, benchmark comparisons, accessible tabs and video viewer.
- `style.css`: responsive appearance.
- `assets/videos/`: 36 MP4s extracted from the author-provided presentation. The video stream is preserved; audio is removed and the MP4 index is moved to the beginning for streaming.
- `assets/posters/`: preview frames from those MP4s.
- `assets/images/`: figures rendered from the manuscript.
- `assets/fonts/`: DM Sans and Space Grotesk, with their SIL Open Font License files.

## Manuscript status

The PDF under `assets/SLIP-VLA.pdf` is the supplied anonymous manuscript. Replace it with the author version when available. The website author list is non-anonymous as requested. NTU is expanded as Nanyang Technological University.

The citation is deliberately `@misc` with `note = {Manuscript}`. When arXiv assigns an identifier, add `eprint`, `archivePrefix = {arXiv}`, and the verified arXiv URL. No acceptance or arXiv publication is claimed.

## Sources and conventions

Numerical results follow the supplied manuscript, including Tables I–IV and VIII. The RoboTwin average of 91.8% is tied with Fast-WAM. The 12 ms figure measures latent imagination; 181 ms is the reported overall inference latency.

Camera and baseline labels follow the presentation's spatial layout. Playback speeds of 4× (real world) and 10× (simulation) are the presentation's labels; browser playback remains 1× to avoid applying acceleration twice. The presentation shows StarVLA comparisons, while the manuscript quantitative tables do not include StarVLA. The page keeps these separate.

### Real-world camera mapping

Columns: observation, scene, left wrist, right wrist.

| Condition | MP4 media numbers | Slide |
| --- | --- | --- |
| Corn to plate | 4, 3, 1, 2 | 5 |
| Unseen background | 9, 10, 11, 12 | 6 |
| Object appearance | 5, 8, 6, 7 | 6 |
| Object orientation | 13, 16, 14, 15 | 6 |
| Two-step pot task | 20, 19, 18, 17 | 7 |
| Three-step pot task | 24, 23, 22, 21 | 7 |

### Simulation mapping

Columns: SLIP-VLA success, StarVLA failure.

| Benchmark and task | MP4 media numbers | Slide |
| --- | --- | --- |
| LIBERO moka pot | 28, 27 | 8 |
| LIBERO cream cheese | 26, 25 | 8 |
| LIBERO-Plus moka pot | 32, 31 | 9 |
| LIBERO-Plus soup and sauce | 30, 29 | 9 |
| RoboTwin hammer | 34, 36 | 10 |
| RoboTwin block arrangement | 33, 35 | 10 |

The visual direction draws on the author's reference to the C2Dex project page, with an independently implemented dark theme and video-first layout. Research figures and demonstrations belong to their respective authors; no blanket content license is implied.
