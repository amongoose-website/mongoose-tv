export default function Icon(props: any) {
    return <span {...props} className={`material-icons ${props.className ? props.className : ''}`}>{props.name}</span>
}