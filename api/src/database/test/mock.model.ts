export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): T { return _createEntityData }

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub
    }
  }

  find(): { exec: () => T[] } {
    return {
      exec: (): T[] => [this.entityStub]
    }
  }

  save(): T {
    return this.entityStub;
  }

  findOneAndUpdate(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub
    }
  }

  findOneAndDelete(): { exec: () => T }{
    return {
      exec: (): T => this.entityStub
    }
  }

  deleteMany(): { deletedCount: number }  {
    return { deletedCount: 1 };
  }
}