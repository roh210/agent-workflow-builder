export const EmptyState = ({ message }: { message: string }) => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 text-lg">{message}</div>
        </div>
    );
}