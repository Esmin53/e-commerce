
interface HeadingProps {
    subtitle: string
    title: string
}

const Heading = ({
    title,
    subtitle
}: HeadingProps) => {

    return (
        <div className="w-fit flex flex-col">
            <p className="text-sm font-medium text-gray-600">{subtitle}</p>
            <div className="w-[125%] max-w-[90vw] border-b-2 border-slate-300 shadow my-1" />
            <h1 className="text-2xl pb-1 text-gray-900 font-semibold">{title}</h1>
        </div>
    )
}

export default Heading;