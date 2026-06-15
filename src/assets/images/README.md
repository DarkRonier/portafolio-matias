# Imágenes del portafolio

> **Importante:** las imágenes reales no se suben a este repositorio público.
> Se ignoran por `.gitignore` y se almacenan de forma cifrada en `src/assets/private/`.
> El workflow de GitHub Pages las descifra durante el deploy usando un secret.

## Estructura esperada

```
src/assets/images/
├── profile/                → Foto de perfil (máx. 1 imagen preferida)
├── proyecto-nicopets/      → Imágenes de NicoPets (máx. 4)
├── proyecto-gridfall/      → Imágenes de Gridfall (máx. 4)
└── proyecto-design3d/      → Imágenes de Design3D (máx. 4)
```

## Formatos soportados

`.png`, `.jpg`, `.jpeg`, `.webp`

## Flujo de trabajo

1. Colocá tus imágenes reales en estas carpetas localmente para desarrollo.
2. Ejecutá `npm run encrypt-assets` para generar los archivos cifrados en `src/assets/private/`.
3. Commiteá y pusheá solo los archivos `.enc`; las imágenes originales permanecen fuera del repo.
4. Durante el deploy, GitHub Actions descifra los assets con el secret `PRIVATE_ASSETS_KEY`.

Si no hay imágenes disponibles, la app muestra placeholders por defecto sin fallar.
