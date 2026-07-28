/** The little four-tile "flag" mark used on boot, login and Start. */
export function BrandFlag() {
  return (
    <div className="boot__flag" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function BrandLogo({ small }: { small?: boolean }) {
  return (
    <div className={small ? 'login__brandlogo' : 'boot__logo'}>
      <BrandFlag />
      <div className="boot__wordmark">
        <b>Daniel</b>
        <strong>OS</strong>
      </div>
    </div>
  );
}
