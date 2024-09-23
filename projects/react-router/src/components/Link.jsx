import { EVENTS } from "../const";

export function navigate(href) {
  window.history.pushState({}, null, href);
  // crear un evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  // enviar el evento
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (e) => {
    const isMainEvent = e.button === 0; // primary click
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      // navegacion con SPA
      e.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
