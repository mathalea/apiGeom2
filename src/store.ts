
class StoreBoolean {
  private _value: boolean
  constructor (value?: boolean) {
    this._value = value ?? false
  }

  get (): boolean {
    return this._value
  }

  set (value: boolean): void {
    this._value = value
  }
}

export const isStopHidden = new StoreBoolean()
