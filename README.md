## 📦 Required Dependencies

Install them all with:

```bash
npm install leaflet react-leaflet react-icons
```

### Breakdown:

| Package             | Command                            | Purpose                            |
|---------------------|-------------------------------------|-------------------------------------|
| `leaflet`           | `npm install leaflet`               | Core mapping engine                 |
| `react-leaflet`     | `npm install react-leaflet`         | React wrapper for Leaflet           |
| `react-icons`       | `npm install react-icons`           | Icon library (used in sidebar UI)   |
| `react-router-dom npm` |`install react-router-dom` |            |
|   `leaflet`      |`npm install react-leaflet leaflet`|    |
|   `polyline`     |`npm install @mapbox/polyline`|     |

```

Also, make sure to **import Leaflet CSS** in your main CSS file (e.g., `App.css` or `index.css`):

```css
@import url('leaflet/dist/leaflet.css');
```

Place your map marker images inside the `public/images/` folder, and reference them like:

```js
image: "/images/xxxx.jpg"
```
