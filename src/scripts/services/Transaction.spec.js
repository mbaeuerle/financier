describe("Transaction", function() {
  let Transaction;

  beforeEach(module('financier'));

  beforeEach(inject(_Transaction_ => {
    Transaction = _Transaction_;
  }));

  it('should be a Transaction', () => {
    const tr = new Transaction({value: 1});
    expect(tr.constructor.name).toBe('Transaction');
  });

  it('should throw when passed non-number', () => {
    expect(() => {
      new Transaction({});
    }).toThrow();
  });

  it('should store value', () => {
    const tr = new Transaction({value: 3.45});
    expect(tr.value).toBe(3.45);
  });

  it('should allow setting value', () => {
    const tr = new Transaction({value: 3.45});
    expect(tr.value).toBe(3.45);
    tr.value = 2.12;
    expect(tr.value).toBe(2.12);
  });

  it('should allow subscribing when created', () => {
    const foo = {
      bar: () => {}
    };
    spyOn(foo, 'bar');

    const tr = new Transaction({value: 3.45}, foo.bar);
    expect(foo.bar).not.toHaveBeenCalled();
    tr.value = 2.12;
    expect(foo.bar).toHaveBeenCalledWith(2.12, 3.45);
  });

  it('should allow subscribing through method call', () => {
    const foo = {
      bar: () => {}
    };
    spyOn(foo, 'bar');

    const tr = new Transaction({value: 3.45});
    tr.subscribe(foo.bar);
    expect(foo.bar).not.toHaveBeenCalled();
    tr.value = 2.12;
    expect(foo.bar).toHaveBeenCalledWith(2.12, 3.45);
  });

  it('should serialize to JSON', () => {
    const tr = new Transaction({value: 5.22, id: 'foobar'});
    expect(JSON.stringify(tr)).toBe('{"value":5.22,"id":"foobar"}')
  })
});
