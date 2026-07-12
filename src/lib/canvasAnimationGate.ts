/**
 * Suspend une boucle d'animation canvas quand l'élément est hors écran
 * ou que l'onglet est caché, et la relance quand il redevient visible.
 * `start` doit être idempotent (ne rien faire si la boucle tourne déjà).
 * Retourne une fonction de nettoyage à appeler au démontage.
 */
export function gateCanvasAnimation(
    canvas: HTMLCanvasElement,
    start: () => void,
    stop: () => void
): () => void {
    let onScreen = false;

    const update = () => {
        if (onScreen && !document.hidden) {
            start();
        } else {
            stop();
        }
    };

    const observer = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        update();
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', update);

    return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', update);
        stop();
    };
}
