import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PropertyType } from 'src/app/shared/enums/property';
import { Property } from 'src/app/shared/interface/property';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-properties-edit',
  templateUrl: './properties-edit.component.html',
  styleUrls: ['./properties-edit.component.scss'],
})
export class PropertiesEditComponent implements OnInit {
  public propertyForm: FormGroup;
  public propertyTypes = [
    {
      label: 'House',
      value: PropertyType.house
    },
    {
      label: 'Apartment',
      value: PropertyType.apartment
    },
    {
      label: 'Pad',
      value: PropertyType.pad
    }, {
      label: 'Boarding house',
      value: PropertyType.boardingHouse
    }
  ];
  private property: Property;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) {
    this.propertyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: [''],
      type: [PropertyType.house],
    });
  }

  ngOnInit() {
    this.propertiesService.property$.subscribe(property => {
      this.property = property;
      this.propertyForm.patchValue(
        {
          name: property.name,
          address: property.address,
          description: property.description,
          type: property.type
        }
      );
    });
  }

  public update() {
    if (!this.propertyForm.valid) {
      return;
    }
    const property = { ...this.property, ... this.propertyForm.value };
    this.propertiesService.updateProperty(property);
    this.modalCtrl.dismiss();
  }

  public close() {
    this.modalCtrl.dismiss();
  }
}