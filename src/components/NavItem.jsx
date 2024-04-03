const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  return (
    <li>
      <a
        href={`#${props.navItem}`}
        class={props.navItem === props.section ? "active" : ""}
        onClick={() => sendSection(props.navItem)}
      >
        {props.navItem}
      </a>
    </li>
  );
};

export default NavItem;
