interface ClassPropertyDecoratorContext {
    kind: string;
    name: string | symbol;
    access: { get(): unknown, set(value: unknown): void };
    static: boolean;
    private: boolean;
}
type ClassPropertyDecorator = (target: undefined, context: ClassPropertyDecoratorContext) => (initialValue: unknown) => unknown | void