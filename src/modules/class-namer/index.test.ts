import { createClassNamer, createSimpleClassNamer } from './index';

describe('createClassNamer', () => {
  const tempStyle = {
    wrapper: 'style-wrapper',
    foo: 'style-foo',
    bar: 'style-bar',
    baz: 'style-baz',
    qux: 'style-qux',
  };
  const namer = createClassNamer(tempStyle);

  test('인수로 받은 "문자열의 여백"을 기준으로 올바른 className을 반환해야합니다.', () => {
    expect(namer().name('wrapper foo bar').read()).toBe('style-wrapper style-foo style-bar');
    expect(namer().name('wrapper').name('foo').read()).toBe('style-wrapper style-foo');
  });

  test('인수로 받은 "문자열들"을 기준으로 올바른 className을 반환해야합니다.', () => {
    expect(namer().name('wrapper foo', 'bar').read()).toBe('style-wrapper style-foo style-bar');
    expect(namer().name('wrapper').name('foo', 'bar').read()).toBe('style-wrapper style-foo style-bar');
  });

  test('조건에 따라 인수로 받은 "문자열의 여백"을 기준으로 올바른 className을 반환해야합니다.', () => {
    expect(namer().name().nameIf(true).read()).toBe('');
    expect(namer().name('wrapper foo').nameIf(true, 'bar').read()).toBe('style-wrapper style-foo style-bar');
    expect(namer().name('wrapper foo').nameIf(true, 'bar baz').read()).toBe(
      'style-wrapper style-foo style-bar style-baz'
    );

    expect(namer().name('wrapper foo').nameIf(false, 'bar').read()).toBe('style-wrapper style-foo');
    expect(namer().name('wrapper foo').nameIf(false, 'bar baz').read()).toBe('style-wrapper style-foo');
  });

  test('조건에 따라 인수로 받은 "문자열들"을 기준으로 올바른 className을 반환해야합니다.', () => {
    expect(namer().name('wrapper foo').nameIf(true, 'bar', 'baz').read()).toBe(
      'style-wrapper style-foo style-bar style-baz'
    );
    expect(namer().name('wrapper foo').nameIf(true, 'bar', 'baz qux').read()).toBe(
      'style-wrapper style-foo style-bar style-baz style-qux'
    );

    expect(namer().name('wrapper foo').nameIf(false, 'bar', 'baz').read()).toBe('style-wrapper style-foo');
    expect(namer().name('wrapper foo').nameIf(false, 'bar', 'baz qux').read()).toBe('style-wrapper style-foo');
  });

  test('여백을 다듬어야합니다.', () => {
    expect(namer().name('  wrapper foo  ').read()).toBe('style-wrapper style-foo');
    expect(namer().name('wrapper    foo').read()).toBe('style-wrapper style-foo');
    expect(namer().name('wrapper  foo  ').read()).toBe('style-wrapper style-foo');
    expect(namer().name('   wrapper   foo').read()).toBe('style-wrapper style-foo');
  });

  test('ClassNamer의 간단한 사용법이 올바르게 작동해야합니다.', () => {
    expect(namer().n('wrapper foo', [true, 'bar', 'baz'])).toBe('style-wrapper style-foo style-bar style-baz');
    expect(namer().n('wrapper', [true, 'bar', 'baz'], 'foo')).toBe('style-wrapper style-bar style-baz style-foo');

    expect(namer().n('wrapper foo', [false, 'bar', 'baz'])).toBe('style-wrapper style-foo');

    const simpleNamer = createSimpleClassNamer(tempStyle);
    expect(simpleNamer('wrapper foo', [true, 'bar', 'baz'])).toBe('style-wrapper style-foo style-bar style-baz');
    expect(simpleNamer('wrapper', [true, 'bar', 'baz'], 'foo')).toBe('style-wrapper style-bar style-baz style-foo');

    expect(simpleNamer('wrapper foo', [false, 'bar', 'baz'])).toBe('style-wrapper style-foo');
  });
});
